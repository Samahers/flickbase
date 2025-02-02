

import { useFormik } from 'formik';
import { useDispatch, useSelector} from 'react-redux';
import { updateUserProfile } from '../../../store/actions/users';

import { errorHelper } from '../../../utils/tools';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';



const UserProfile = () => {

    const {firstname, lastname, age} = useSelector(state => state.users.data)
    const dispatch = useDispatch()

    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{firstname,lastname, age},
        onSubmit:(values)=>{
            dispatch(updateUserProfile(values))
        }
    })

return(

    <>
    <form className='mt-3 article_form ' style={{maxWidth:'250px'}} onSubmit={formik.handleSubmit}>
        <div className='form-group'>
            <TextField
            style={{width:'100%'}}
            name="firstname"
            label="enter your first name"
            variant="outlined"
            {...formik.getFieldProps('firstname')}
            {...errorHelper(formik,'firstname')}
            />
        </div>

        <div className='form-group'>
            <TextField
            style={{width:'100%'}}
            name="lastname"
            label="enter your last name"
            variant="outlined"
            {...formik.getFieldProps('lastname')}
            {...errorHelper(formik,'lastname')}
            />
        </div>

        <div className='form-group'>
            <TextField
            style={{width:'100%'}}
            name="age"
            label="enter your age"
            variant="outlined"
            {...formik.getFieldProps('age')}
            {...errorHelper(formik,'age')}
            />
        </div>

        <Button
            className='mt-3'
            variant='contained'
            color='primary'
            type='submit'
        >
            save
        </Button>
    </form></>
)

}

export default UserProfile