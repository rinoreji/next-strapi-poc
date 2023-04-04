import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { useEffect, useState } from "react";
import Header from "../components/header";
import AddTodo from "../components/addTodo";
import TodoList from "../components/todoList";
import axios from "axios";

const inter = Inter({ subsets: ['latin'] })
const API_URL='https://1337-rinoreji-nextjsstrapipo-zatocsgqepo.ws-us93.gitpod.io/api/';
    export default function Home() {
      const [todos, setTodos] = useState([]);
      useEffect(() => {
        const fetch = async ()=>{
          const result = await axios.get(API_URL + "to-dos?fields[0]=ToDoText");
          var resp = result?.data?.data.map(todomap);
        setTodos(resp);
        console.log('fetch',result, resp);
      };
      fetch();
      }, []);

      const todomap = (t)=> {
        return ({
          id: t.id,
          ToDoText:t.attributes.ToDoText
        });
      }
      const fetch = async ()=>{
          const result = await axios.get(API_URL + "to-dos?fields[0]=ToDoText");
          var resp = result?.data?.data.map(todomap);
        setTodos(resp);
        console.log('fetch',result, resp);
      };
      const addTodo = async (todoText) => {
        //fetch();

        if (todoText && todoText.length > 0) {
          const result = await axios.post(API_URL + "to-dos", {
            data:{
              ToDoText: todoText,
            }
          });
          setTodos([...todos, todomap(result?.data.data)]);
        }
      };
      const deleteTodoItem = async (todo) => {
        if (confirm("Do you really want to delete this item?")) {
          await axios.delete(API_URL + "to-dos/" + todo.id);
          const newTodos = todos.filter((_todo) => _todo.id !== todo.id);
          console.log(newTodos);
          setTodos(newTodos);
        }
      };
      const editTodoItem = async (todo) => {
        const newTodoText = prompt("Enter new todo text or description:");
        if (newTodoText != null) {
          const result = await axios.put(API_URL + "to-dos/" + todo.id, {
            data:{
              ToDoText: newTodoText,
            }
          });
          const moddedTodos = todos.map((_todo) => {
            if (_todo.id === todo.id) {
              return todomap(result?.data.data);
            } else {
              return _todo;
            }
          });
          setTodos(moddedTodos);
        }
      };
      return (
        <div>
          <Head>
            <title>ToDo app</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <main className="main">
            <AddTodo addTodo={addTodo} />
            <TodoList
              todos={todos}
              deleteTodoItem={deleteTodoItem}
              editTodoItem={editTodoItem}
            />
          </main>
        </div>
      );
    }