import {api} from '../../service/api'


import styles from './styles.module.scss'

import logoImg from  '../../assets/logo.svg'
import { useEffect, useReducer, useState } from 'react'



type Message = {
  id: string,
  text: string,
  user:{
    name:string,
    avatar_url:  string
  }
}

export function MessageList(){

  const [messages , setMessages] = useState<Message[]>([])

  useEffect(()=> {
    // chamada api
    api.get<Message[]>('/messages/last3').then(response => {
      setMessages(response.data)
    }) 

  } , [])

  return(
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="Dowhile2021" />




      <ul className={styles.messageList}>

        {messages.map(message => {
          return (
              <li key={message.id} className={styles.message}>
                <p className={styles.messageContent}>{message.text}</p>
                <div className={styles.messageUser}>

                    <div className={styles.userImage}>
                      <img src={message.user.avatar_url} alt={message.user.name} />
                    </div>
                  <span>{message.user.name}</span>
                </div>
              </li>
          )
        })}

        
      </ul>
    </div>
  )
}