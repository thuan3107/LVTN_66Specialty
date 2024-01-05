import { useState } from 'react'
import './Chat.css'
import Header from '../Home/Header.jsx';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import {  MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
import SettingsVoiceIcon from '@mui/icons-material/SettingsVoice';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import logo from "./chatbot.png";
const API_KEY = "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";
// "Explain things like you would to a 10 year old learning how to code."
const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
  "role": "system", "content": "Explain things like you're talking to a software professional with 2 years of experience."
}

function Chatgpt3() {
  const [messages, setMessages] = useState([
    {
      message: "Xin chào, Mình là Mr.khỏe! Bạn có thể hỏi bất cứ điều gì!",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]) 

  const { message, setMessage }= useState("")
  const { transcript, setTranscript } = useSpeechRecognition();
  const handleStartListening = () => {
    SpeechRecognition.startListening();
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleResetTranscript = (e) => {
    const { value } = e.event.target;
  
    setTranscript(value);
  };

  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
          message,
      
          direction: 'outgoing',
          sender: "user"
    };

   
  
    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

 
     
 const handleBot= (e)=>{
    const { value } = e.target;

    setTranscript(value);
  }

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
   
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });
    
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
   
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "ChatGPT"
      }]);
      setIsTyping(false);
    });
  }
 
  return (
    
    <div>
      <Header/>
      <div  className='container_main'>
       <a href="" className='logo'> 
        <img src={logo} alt="" /></a>
        <div className='mainBot'
      
        >
            <MessageList 
               style={{display:"block"}}
         
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Mr.khỏe đang soạn tin" /> : null}
            >
              
              {messages.map((message, i) => {
                 
                console.log(message)
                return    <Message key={i} model={message} >    
                 </Message>
              })}
            </MessageList>

           <div
            style={{display:"flex"}}
            
           > 

           <SettingsVoiceIcon  
           style={{marginTop:"8px"}}
           onClick={handleStartListening}/> 
           {/* <buttoSettingsVoiceIconn onClick={handleResetTranscript}/> */}
           
           <MessageInput
           id='messenges'
           style={{width:"45rem"}}
           value={`${transcript}`}
           onChange={handleBot}
           placeholder="Nhập vào nội dung" onSend={handleSend} />
           </div>
          
        </div>


                

          
    
      </div>



    </div>
  )
}

export default Chatgpt3;
