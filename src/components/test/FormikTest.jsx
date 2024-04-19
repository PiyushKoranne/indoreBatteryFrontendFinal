import {Formik, Form, Field, ErrorMessage, useField} from "formik";
import { useState } from "react";
import * as Yup from "yup";
import log from "../../utils/utilityFunctions";



const sleep = (ms) => { return new Promise((res, rej)=> setTimeout(res, ms))}

const CustomTextField = ({label, helperText, ...props}) => {
	const [field, meta] = useField(props);
	log(field, meta);
	const [didFocus, setDidFocus] = useState(false);

	const showFeedback = meta.touched;


	return (
		<div className={`flex flex-col items-start w-[100%] ${showFeedback ? meta.error ? 'warn-parent-div':'success-parent-div':''}`}>
			<div className="flex items-center justify-between w-full">
				<label htmlFor={props.id} className="text-[15px] font-[500] " >{label}</label>
				{ showFeedback &&  <div className="feedback text-[13px]">{meta.error ? meta.error : '✔️' }</div>}
			</div>
			<input onFocus={()=>{setDidFocus(true)}} className="w-full border-[2px] rounded-[6px] outline-none p-[6px] m-[0px]" {...field} {...props} />
			{ helperText && <p className="font-sans text-[12px] font-[400] leading-[15px]">{helperText}</p> }
		</div>
	)

}

const CustomSelectField = ({label, helperText, initialOption, ...props}) => {
	const [field, meta] = useField(props);
	const [didFocus, setDidFocus] = useState(false);
	log("SELECT FORMIK META :: ",meta)
	const showFeedback = didFocus || meta.touched;

	return (
		<div className={`flex flex-col items-start w-[100%] ${ meta.error ? 'warn-parent-div':''}`}>
			<div className="flex items-center justify-between w-full">
				<label htmlFor={props.id} className="text-[15px] font-[500]">{label}</label>
				{ meta.error ?  (<div className="feedback text-[13px]">{meta.error ? meta.error : "✔️"}</div>) : null }
			</div>
			<select onFocus={()=>{setDidFocus(true)}} {...field} {...props} className="w-full  rounded-[0] p-[10px] border border-[rgba(0,0,0,0.2)] rounded-md focus:outline-none  bg-[transparent]">
				<option value="">{initialOption}</option>
				
			</select>
			{ helperText && <p className="font-sans text-[12px] font-[400] leading-[15px]">{helperText}</p> }
		</div>
	)
}

const CustomForm = ({car}) => {

	const formValidationSchema = Yup.object({
		carBrand:Yup.string().required("Please choose a manufacturer"),
		carModel:Yup.string().required("Please choose a model"),
		batteryBrand:Yup.string().required("Please choose a battery brand"),
		// state:Yup.string().required("Please choose a brand"),
		// city:Yup.string().required("Please choose a brand"),
	})
 
	return (
	<div>
		<Formik
			initialValues={{carBrand:"", carModel:"", batteryBrand:"", state:"", city:""}}
			validationSchema={formValidationSchema}
			onSubmit={(values, {setSubmitting}) => {
				alert(JSON.stringify(values));
				setSubmitting(false);
			}}
		>	
			{
				({isSubmitting})=>(
					<Form className="w-[400px] flex flex-col gap-[10px]">
						<CustomSelectField name="carBrand" label={"Car Brand"} id="carbrand-field" initialOption="Choose a Manufacturer" />
						<CustomSelectField name="carModel" label={"Car Model"} id="carmodel-field" initialOption="Choose a Model" />
						<CustomSelectField name="batteryBrand" label={"Battery Brand"} id="batterybrand-field" initialOption="Choose a Brand" />
						<div className="flex justify-between gap-[20px]">
							<CustomSelectField name="state" label={"State"} id="state-field" initialOption="State" />
							<CustomSelectField name="city" label={"City"} id="city-field" initialOption="City" />
						</div>
						<button className="px-[30px] py-[6px] bg-[#2271b1] font-[500] text-white" disabled={isSubmitting} type="submit">{ isSubmitting ? '...' :'Submit'}</button>
					</Form>
				)
			}
		</Formik>
	</div>
  )
}

export default CustomForm;