/* 
express router

GET /news
PUT /news/


router.get('/coolestapi/news, req, res => {
    NewsApiMicroservice.getNews({request: req})
    
    kafkaConsumer.listen('returnNews', (data) => {       
        const response = {request: data.req, response: data.response.news}
        res.send(response)
    })

})
*/