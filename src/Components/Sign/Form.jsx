import { useContext } from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { Sign } from '../../App';

const Form = () => {
    const { sign } = useContext(Sign);

    const url = "http://localhost:8080/users"
    return (
        <div>
            {
                sign ? <SignIn /> : <SignUp />
            }
        </div>
    );
}

export default Form;
