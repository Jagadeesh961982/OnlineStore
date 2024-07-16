class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;

    }
    search(){
        // console.log(this.query)
        const keyword=this.queryStr.keyword?(
            {
                name:{
                    $regex:this.queryStr.keyword,
                    $options:'i'
                }
            }
        ):({
            name:{
                $regex:'',
                $options:'i'
            }
        })
        
        this.query=this.query.find({...keyword});
        return this;
    }
    filter(){
        const queryCopy={...this.queryStr}
        // removing fields from query
        const removeFields=['keyword','limit','page']
        removeFields.forEach(el => delete queryCopy[el])

        // Advance filter for price, ratings etc
        let queryStr=JSON.stringify(queryCopy)
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)

        queryStr=JSON.parse(queryStr)
        // console.log(queryStr)
        
        this.query=this.query.find(queryStr)
        return this;
        
    }
    pagination(resultPerPage){
        console.log(Number(this.queryStr.page))
        const currentPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currentPage-1);
        // console.log(this.query);
        // console.log("............................................................")
        this.query=this.query.limit(resultPerPage).skip(skip);
        // console.log(this.query);
        return this;

    }
}

export default ApiFeatures;