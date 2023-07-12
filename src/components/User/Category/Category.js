import { useParams } from "react-router"
import Header from "../Header/Header"
import { useState, useEffect } from "react"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Category(){
    const {name}=useParams()
    const [listProduct, setListProduct] = useState([])

    useEffect(() => {
        axios.get("http://localhost:4000/product")
            .then(function (response) {
                //Xử lí khi thành công
                setListProduct(response.data)
            })
            .catch(function (error) {
                //Xử lí khi lỗi
                toast.error("Something went wrong!")
            })
    }, [])

    useEffect(()=>{
        listProduct.map(item=>
            {
                if(item.category==name){
                
                }
            }
            )
        
    })

    
    return (
        <>
            <Header/>
            
        </>
    )
}

export default Category