import * as Yup from 'yup'

export const formValues = {
    title:'',
    content:'',
    excerpt:'',
    score:'',
    director:'',
    actors:[],
    status:'draft',
    category:'',
}

export const validation = () => (
    Yup.object({
        title:Yup.string()
        .required('Sorry, the title is required')
        ,
        content:Yup.string()
        .required('Sorry, the content is required')
        .min(50,'that is it? ...write some more')
        ,
        excerpt:Yup.string()
        .required('Sorry, the excerpt is required')
        .max(500,'Sorry 500 max'),
        score:Yup.number()
        .required('required')
        .min(0,'0 is the min')
        .max(100,'100 is the max'),
        director:Yup.string()
        .required('Sorry, the Director is required'),
        actors:Yup.array()
        .required('Sorry, the Actors is required')
        .min(3, 'Must be 3 at least')
        ,
        status:Yup.string()
        .required('Sorry, the Status is required'),
        category:Yup.string()
        .required('Sorry, the category is required'),

    })
)