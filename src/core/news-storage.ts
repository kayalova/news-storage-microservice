/* 
(static) class NewsCoreService {
    getNewsFromDb() {
        postgres.please.giveMeAllNews()
    }
    
    updateNews(news) {
        postgres.please.updateNews(news)
    }

    start() {
        // some db settings
        // ...
        // kafkaProducer init

        kafkaConusumer.listen('newsCore', data => {
            // switch data.req.request..
            //  getNews -> getNewsFromDb() -> result
            //  updateNews -> updateNews(data.req.request.news) -> result

            kafkaProducer.send('returnNews', result)
        })
    }
}

NewsCoreService.start()
*/

