import axios from 'axios';
import { useEffect, useState } from 'react';

function Test() {
    const [listUser, setListUser] = useState([])
    const [isChanged, setIsChanged] = useState(false)
    useEffect(() => {
        axios.get("http://localhost:4000/user")
            .then(function (response) {
                // handle success
                setListUser(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }, [isChanged])


    const handleAdd = () => {
        setIsChanged(!isChanged);
        return axios.post("http://localhost:4000/user", {
            // headers: {
            //     'Content-Type': 'application/json',
            // },
            name: "Hello",
            email: "viet311@gmail.com",

        })
            // .then(response => response.json())
            // .then(console.log(newPerson))

            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleDelete = () => {
        setIsChanged(!isChanged);

        return axios.delete("http://localhost:4000/user/2")
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    const handleUpdate = () => {
        setIsChanged(!isChanged);

        return axios.put("http://localhost:4000/user/3", {

            // headers: {
            //     'Content-Type': 'application/json',
            // },
            name: "Hello",
            email: "viet31121111111111111111111111@gmail.com",


        })
            .then(function (repsone) {
                console.log(repsone);
            })
            .catch(function (error) {
                console.log(error);
            })

    }

    return (
        <>
            {listUser.map(item => {
                return (
                    <>
                        <ul>
                            <li>{JSON.stringify(item)}</li>
                        </ul>
                    </>
                )
            })}

            <button onClick={handleAdd}>Add new user</button>
            <button onClick={handleDelete}>Delete user</button>
            <button onClick={handleUpdate}>
                Update
            </button>
        </>
    )
}

export default Test