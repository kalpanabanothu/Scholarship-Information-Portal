import React, { useState } from "react"
import axios from 'axios'
import { styles } from "../styles"

import { LoadingOutlined } from '@ant-design/icons'

import Avatar from '../Avatar'

const EmailForm = props => {    
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    function getOrCreateUser(callback) {
        axios.put(
            'https://api-CF9FFF42-D0A5-4C38-A66A-9E04E7FE8928.sendbird.com/v3/users/',
            {
                "user_id": "sendbird_desk_agent_id_b90f3bbb-7cb3-4b04-95b0-4c3ff8406737",
                "nickname": "smash cracker",
                "issue_access_token": true,
                "session_token_expires_at": 1542945056625,
            }
            // {headers: {"Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY}}
        )
        .then(r => callback(r.data))
        .catch(e => console.log('Get or create user error', e))
    }

    function getOrCreateChat(callback) {
        axios.put(
            'https://api.chatengine.io/chats/',
            {usernames: [email, 'Adam La Morre'], is_direct_chat: true},
            {headers: {
                "Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
                "User-Name": email,
                "User-Secret": email,
            }}
        )
        .then(r => console.log(r))
        .catch(e => console.log('Get or create chat error', e))
    }


    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true)
        console.log('Sending Email', email)
        getOrCreateUser();
        // getOrCreateUser(
        //     user => {
        //         // props.setUser && props.setUser(user)
        //         // getOrCreateChat(chat => {
        //         //     setLoading(false)
        //         //     props.setChat && props.setChat(chat)
        //         // })
        //         getOrCreateChat(chat => console.log("sux",chat))
        //     }
        // )
    }

    return (
        <div 
            style={{
                ...styles.emailFormWindow,
                ...{ 
                    height: props.visible ? '100%' : '0px',
                    opacity: props.visible ? '1' : '0'
                }
            }}
        >
            <div style={{ height: '0px' }}>
                <div style={styles.stripe} />
            </div>

            <div 
                className='transition-5'
                style={{
                    ...styles.loadingDiv,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '0.33' : '0',
                    }
                }}
            />
            <LoadingOutlined
                className='transition-5'
                style={{
                    ...styles.loadingIcon,
                    ...{ 
                        zIndex: loading ? '10' : '-1',
                        opacity: loading ? '1' : '0',
                        fontSize: '82px',
                        top: 'calc(50% - 41px)', 
                        left: 'calc(50% - 41px)',  
                    }
                }}
            />

            <div style={{ position: 'absolute', height: '100%', width: '100%', textAlign: 'center' }}>
                <Avatar 
                    style={{ 
                        position: 'relative',
                        left: 'calc(50% - 44px)',
                        top: '10%',
                    }}
                />

                <div style={styles.topText}>
                    Welcome to my <br /> support 👋
                </div>

                <form 
                    onSubmit={e => handleSubmit(e)}
                    style={{ position: 'relative', width: '100%', top: '19.75%' }}
                >
                    <input 
                        placeholder='Your Email'
                        onChange={e => setEmail(e.target.value)}
                        style={styles.emailInput}
                    />
                </form>

                <div style={styles.bottomText}>
                    Enter your email <br /> to get started.
                </div>
            </div>
        </div>
    )
}

export default EmailForm;