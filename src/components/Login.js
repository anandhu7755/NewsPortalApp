import React, { useState } from 'react'
import { Button, Divider, Form, Grid, Segment, Header, Image, Modal } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';
import SignUp from './SignUp';
import { getAllUsers, setCurrentUser } from '../shared/users/userSlice'
import { useSelector, useDispatch } from 'react-redux'
//import { }

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = React.useState(false)
    //const navigate = useNavigate();
    const allUsers = useSelector(getAllUsers);

    const onLogin = () => {
        let existingUsers = allUsers?.filter(x=>{return (x?.email === userName)})
        if (existingUsers && existingUsers.length > 0){
            dispatch(setCurrentUser(existingUsers[0]));
            navigate('/home');
        }
    }
    



    return (
        <Segment className='loginSegment' placeholder>
            <Grid columns={2} relaxed='very' stackable>
                <Grid.Column>
                    <Form onSubmit={onLogin}>
                        <Form.Input
                            icon='user'
                            iconPosition='left'
                            label='Username'
                            placeholder='Username'
                            onChange={(e) => { setUserName(e.target.value) }}
                        />
                        <Form.Input
                            icon='lock'
                            iconPosition='left'
                            label='Password'
                            type='password'
                            onChange={(e) => { setPassword(e.target.value) }}
                        />

                        <Button content='Login' primary />
                    </Form>
                </Grid.Column>

                <Grid.Column verticalAlign='middle'>
                    <Modal
                        onClose={() => setOpen(false)}
                        onOpen={() => setOpen(true)}
                        open={open}
                        trigger={<Button>Sign up</Button>}
                        size='tiny'
                        closeIcon={true}
                    >
                        <Modal.Header>Sign Up</Modal.Header>
                        <Modal.Content content>
                            <SignUp></SignUp>
                        </Modal.Content>

                    </Modal>
                </Grid.Column>
            </Grid>

            <Divider vertical>Or</Divider>
        </Segment>

    )
}

export default Login
