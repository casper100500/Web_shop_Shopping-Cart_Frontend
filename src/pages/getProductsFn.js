

const getProducts =  (findStr,PageNum,PageLimit,callback=()=>{}) => {
  console.log('PageNum:'+PageNum)
  console.log('PageLimit:'+PageLimit)
      let requestBody = {
        query: `
        query{
          productsALL(findStr:"${findStr}", PageNum:${PageNum}, PageLimit:${PageLimit}){
          
            Products {
             _id,
            title,
            price,
            imagePath
          },
          TotalCount
        }
      }
        `
      };
  
      console.log(requestBody)
  
      let { env } = require('../nodemon.json')
  
      //can be use axios and other API library

      //console.log(env.backendGraphQL)

      fetch(env.backendGraphQL, {
        method: 'POST',
        body: JSON.stringify(requestBody),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {

          console.log(res)
          if (res.status !== 200 && res.status !== 201) {
        //    alert.error(`Error`, { timeout: 5000 })
            throw new Error('Failed!');
          }
          return res.json()
        })
        .then(resData => {
          console.log('Post result:')
          console.log(resData)
          console.log(resData.data.productsALL)
  
          return callback(resData.data.productsALL,null)
       //   return callback()
        })
        .catch(err => {
          console.log(err);
          return callback(null,err)
        });
    }
export default (getProducts);