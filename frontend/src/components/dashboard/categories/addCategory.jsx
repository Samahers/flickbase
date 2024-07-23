import { useFormik } from "formik"
import { useDispatch } from "react-redux"
import * as Yup from 'yup'
import { errorHelper } from "../../../utils/tools"
import {
    TextField, 
    Button
}
 from '@mui/material'
import { addCategory } from "../../../store/actions/articles"

const AddCategory = () => {

    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize:true,
        initialValues:{name:''},
        validationSchema: Yup.object({
            name:Yup.string()
            .required('the name is required ')
        }),
        onSubmit:(values,{resetForm})=>{
            dispatch(addCategory(values))
            resetForm
        }
    })

    return(
        <>
        <form onSubmit={formik.handleSubmit}>

            <div className="form-group">
                <TextField
                style={{width:'100%'}}
                name="name"
                label="enter a name"
                variant="outlined"
                {...formik.getFieldProps('name')}
                {...errorHelper(formik,'name')}
                />
            </div>
            <Button
                variant ="contained"
                color="primary"
                type="submit"
            >
                add category
            </Button>
        </form>
        </>
    )
}


export default AddCategory