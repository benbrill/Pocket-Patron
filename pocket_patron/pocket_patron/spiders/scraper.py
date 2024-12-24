import scrapy
from ..items import PocketPatronItem

class ScraperSpider(scrapy.Spider):
    name = "history_scraper"
    allowed_domains = ["playbill.com"]

    years = [2021, 2022, 2023, 2024]
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
            yield pocket_patron_item

            

    def show_details_parse(self, response):
        show_details = response.css(".bsp-article-content").css("p::text").getall()
        show_details = " ".join(show_details)
        yield {"details": show_details}



