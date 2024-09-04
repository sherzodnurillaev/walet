import SignIn from './SignIn';
import SignUp from './SignUp';

const Form = () => {

    const url = "http://localhost:8080/users"
    return (
        <div>
            <div className="">
                {
                    <SignIn />
                }
            </div>
        </div>
    );
}

export default Form;
