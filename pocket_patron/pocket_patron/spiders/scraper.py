import scrapy
from ..items import PocketPatronItem
import re


class CurrentSpider(scrapy.Spider):
    name = "current_scraper"
    allowed_domains = ["playbill.com"]

    start_urls = ["https://playbill.com/shows/broadway"]

    def parse(self, response):
        shows = response.css(".show-container")
        print(shows)
        for show in shows:
            pocket_patron_item = PocketPatronItem()
            # image_url = show.css(".cover-container a img").xpath("@src").get()
            # if image_url:
            #     pocket_patron_item["image_urls"] = ["https:" + image_url]
            pocket_patron_item["title"] = show.css(".info-container .prod-title a::text").get()
            pocket_patron_item["url"] = show.css(".info-container .prod-title a").xpath("@href").get()

            pocket_patron_item["season"] = 2025
            yield response.follow(pocket_patron_item["url"], self.show_details_parse, meta={"pocket_patron_item": pocket_patron_item})


    def show_details_parse(self, response):
        pocket_patron_item = response.meta['pocket_patron_item']

        description = ''.join(response.css("div.bsp-bio-text").xpath('//p//text()').getall()).replace('\n', ' ').strip()
        pocket_patron_item["description"] = description.replace('                                 ', ' ')
        pocket_patron_item["theater"] = response.css("ul.bsp-bio-links li a::text").extract()[0]
        pocket_patron_item["theater_address"] = response.css("ul.bsp-bio-links li a::text").extract()[1]
        pocket_patron_item["tags"] = list(set(response.css("div.bsp-bio-content div.bsp-bio-subtitle h5::text").getall()))
        image_url = response.css(".carousel-image").xpath("@data-flickity-lazyload").get()
        if image_url:
                pocket_patron_item["image_urls"] = ["https:" + image_url]

        # cast = response.css("div.bsp-component-content div.bsp-list-promo ul.bsp-list-promo-list div.bsp-list-promo-section-text div.bsp-list-promo-title a").xpath("@href").getall()
        potential_cast_links = response.css("div.bsp-component-cta a").xpath("@href").getall()
        potential_cast = [
            link for link in potential_cast_links if re.search(r"personlistpage\/.*cp", link)
        ]

        cast = potential_cast[0] if potential_cast else None
        # yield response.follow(cast, self.parse_cast, meta={"pocket_patron_item": pocket_patron_item})
        yield pocket_patron_item

    def parse_cast(self, response):
        pocket_patron_item = response.meta['pocket_patron_item']
        


class ScraperSpider(scrapy.Spider):
    name = "history_scraper"
    allowed_domains = ["playbill.com"]

    years = [2024]
    # years += [i for i in range(2010,2020)]
    # years = [i for i in range(1995,2010)]
    start_urls = [f"https://playbill.com/seasons?year={i}" for i in years]

    def parse(self, response):
        shows = response.css("table.bsp-table").css("tr")
        for show in shows:
            pocket_patron_item = PocketPatronItem()
            
            pocket_patron_item["title"] = show.css(".col-1 a::text").get()
            pocket_patron_item["url"] = show.css(".col-1 a").xpath("@href").get()
            image_url = show.css(".col-0 a img").xpath("@src").get()
            
            if image_url:
                pocket_patron_item["image_urls"] = ["https:" + image_url]
            
            pocket_patron_item["season"] = int(response.url[-4:])
            yield response.follow(pocket_patron_item["url"], self.show_details_parse, meta={"pocket_patron_item": pocket_patron_item})

            

    def show_details_parse(self, response):
        # pocket_patron_item["show_details"] = response.css(".bsp-article-content").css("p::text").getall()
        pocket_patron_item = response.meta['pocket_patron_item']

        description = ''.join(response.css("div.bsp-bio-text").xpath('//p//text()').getall()).replace('\n', ' ').strip()
        pocket_patron_item["description"] = description.replace('                                 ', ' ')
        pocket_patron_item["theater"] = response.css("ul.bsp-bio-links li a::text").extract()[0]
        pocket_patron_item["theater_address"] = response.css("ul.bsp-bio-links li a::text").extract()[1]
        pocket_patron_item["tags"] = list(set(response.css("div.bsp-bio-content div.bsp-bio-subtitle h5::text").getall()))
        yield pocket_patron_item
        



