A REST API  for [SERP](https://github.com/christophebe/serp) which is a Google search scraper

## API

[GET]
[http://localhost:3000/search?**host**=google.be&**lr**=lang_fr&**cr**=BE&**num**=100&**pws**=0&**keyword**=camping%20car](http://localhost:3000/search?**host**=google.be&**lr**=lang_fr&**cr**=BE&**num**=100&**pws**=0&**keyword**=camping%20car)

Mandatory : 
- **keyword** : the target keyword

Not mandatory : 
- **host** : the google host like google.fr, google.be, google.nl, .... (default : google.com)
- **lr** : limits the languages used to return results. Not hugely effective. 
- **cr** : limits the search results to pages/sites from certain locations.
- **num** : the number of result (default : 10).
- **pws** : controls whether personalised search is on or not. Set to 1 to activate, and 0 to turn it off (default : 0).

More info here : https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters

You can also use a scrape API like [scrapeapi.com](https://www.scraperapi.com/?fp_ref=christophe65) by adding the API url in the parameter : 
- **scrapeApiUrl** : eg. `http://api.scraperapi.com/?api_key=${ accessKey }`


## with Docker 

### without proxies 
docker run -p 3000:3000 --name serp  christophelombart/serp:latest


### with proxies
You need to add the proxies into a text file. One line for each proxy with the following structure : host:port:user:password 
You have to run the container with the following parameters : 

docker run -p 3000:3000 -e PROXY_FILE=/config/proxies.txt  -v [complete path]/config:/config --name serp  christophelombart/serp:latest


## Proxies or Scrape API ? 

If you make many requests at the same time or over a limited period of time, Google may ban your IP address.  This can happen even faster if you use particular search commands such as:  intitle, inurl, site:, ... 

It is therefore recommended to use proxies. The SERP module supports two solutions: 
- Datacenter proxies  like for example those proposed by [Mexela](https://mexela.com/aff.php?aff=191). Shared proxies are more than enough. 

- Scrape APIs such as [scrapeapi.com](https://www.scraperapi.com/?fp_ref=christophe65)

**What to choose? Datacenter proxies or Scrape API ?** 

It all depends on what you are looking for. Datacenter proxies will provide the best performance and are generally very reliable. You can use the "retry" option to guarantee even more reliability. It's also a solution that offers a good quality/price ratio but it will require more effort in terms of development, especially for the rotation of proxies. 

Although slower, the scrape APIs offer other features such as the geolocation of IP addresses over a larger number of countries and the ability to scrape dynamic pages. Using such an API can also simplify the code. Unfortunately, this solution is often more expensive than data center proxies. So, scrape APIs becomes interesting if you have other scrape needs. 

In all cases, make a test with [shared proxies](https://mexela.com/aff.php?aff=191) in order to check it is suffisiant for your use cases.Those proxies are really cheap. 


## TODO

 Add all options provided by [SERP](https://github.com/christophebe/serp)