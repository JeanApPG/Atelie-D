import { useEffect, useState, useRef } from "react";
import { api } from "../../services/api";


export function Home() {
    const [users, setUsers] = useState([]);
    const formRef = useRef();
    const inputName = useRef();
    const inputEmail = useRef();

    async function getUsers() {
        const usersFromAPI = await api.get("/users");
        setUsers(usersFromAPI.data);
    }

    async function createUser() {
        if (inputName.current.value && inputEmail.current.value) {
            await api.post("/users", {
                name: inputName.current.value,
                email: inputEmail.current.value
            });
            formRef.current.reset();
            getUsers();
        }
        else{
            alert("Preencha os dados!");
        }
    }

    async function deleteUser(id) {
        await api.delete(`/users/${id}`);
        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <h1>Teste</h1>
            <form ref={formRef}>
                <input name="name" placeholder="Nome" type="text" ref={inputName} />
                <input name="email" placeholder="Email" type="text" ref={inputEmail} />
                <button type="button" onClick={createUser}>Cadastrar</button>
            </form>
            {
                users.map((user) => (
                    <div key={user.id}>
                        <p>ID: {user.id}</p>
                        <p>Nome: {user.name}</p>
                        <p>Email: {user.email}</p>
                        <button type="button" onClick={() => deleteUser(user.id)}>Deletar</button>
                    </div>
                ))
            }
        </>
    );
}