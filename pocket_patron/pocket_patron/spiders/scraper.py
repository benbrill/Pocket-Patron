import scrapy


class ScraperSpider(scrapy.Spider):
    name = "history_scraper"
    allowed_domains = ["playbill.com"]

    # years = [i+2008 for i in range(12)] + [2021,2022,2023,2024]
    years = [2021,2022,2023,2024]

    start_urls = [f"https://playbill.com/seasons?year={i}" for i in years]

    def parse(self, response):
        shows = response.css("table.bsp-table").css("tr")
        for show in shows:
            title = show.css(".col-1").css("a::text").get()
            url = show.css(".col-1").css("a").xpath("@href").get()
            image = show.css(".col-0").css("a").css("img").xpath("@src").get()
    
            yield {"title": title, "url": url, "image": "https:" + image, "season": int(response.url[-4:])}
            # yield from scrapy.Request(url, callback = self.show_details_parse)

    def show_details_parse(self, response):
        show_details = response.css(".bsp-article-content").css("p::text").getall()
        show_details = " ".join(show_details)
        yield {"details": show_details}



