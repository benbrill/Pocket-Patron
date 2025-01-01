# Define here the models for your scraped items
#
# See documentation in:
# https://docs.scrapy.org/en/latest/topics/items.html

import scrapy

class PocketPatronItem(scrapy.Item):
    title = scrapy.Field()
    url = scrapy.Field()
    image_urls = scrapy.Field()  # For ImagesPipeline
    images = scrapy.Field()  # Stores metadata about downloaded images
    season = scrapy.Field()
    description = scrapy.Field()
    theater = scrapy.Field()
    theater_address = scrapy.Field()
    tags = scrapy.Field()

