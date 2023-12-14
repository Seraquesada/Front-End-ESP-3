import { Button, FormControl, InputLabel, MenuItem } from "@mui/material";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Controller, useForm } from "react-hook-form";
import { CustomTextField } from './Inputs/CustomTextField';
// Extra
import { ErrorMessage } from '@hookform/error-message';

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Como estamos usando yup para validar los campos, podemos crear una interfaz desde el schema
// interface DataForm {
// 	name: string;
// 	lastName: string;
// 	email: string;
// 	gender: string;
// }

export const Form = () => {

	// Creamos el schema
	const schema = yup.object({
		name: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres"),
		lastName: yup.string().required("Este campo es requerido").min(2, "Mínimo 2 caracteres").max(10, "Máximo 10 caracteres"),
		email: yup.string().required("Este campo es requerido").email("El correo no es válido").matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Debe ser un email valido"),
		gender: yup.string().required("Es campo es requerido")
	})

	type DataForm = yup.InferType<typeof schema>

	const {
		control,
		register,
		formState: {errors},
		handleSubmit,
		getValues,
	} = useForm<DataForm>({resolver: yupResolver(schema), defaultValues: {}});

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<Box sx={{maxWidth: "500px"}}>
			<Paper
				elevation={1}
				sx={{p: "32px", display: "flex", flexDirection: "column", gap: 3}}
			>
				<Typography variant="h4" align="center">
					Datos personales
				</Typography>
				<form onSubmit={handleSubmit(onSubmit)}>
					<CustomTextField
						name="name"
						label="Nombre"
						type="text"
						control={control}
						// error={errors.name ? true : false}
						// message={errors.name?.message}
						defaultValue=""
					/>

					{/* {errors.name && <span>Este campo es requerido</span>} */}
					<Typography variant='caption' color='red'>
						{errors.name?.message}
						{/* <ErrorMessage errors={errors} name="name" render={} /> */}
					</Typography>

					<CustomTextField
						name="lastName"
						label="Apellido"
						type="text"
						control={control}
						// error={errors.lastName ? true : false}
						// message={errors.lastName?.message}
						defaultValue=""
					/>
					

					{/* {errors.lastName && <span>Este campo es requerido</span>} */}
					<Typography variant='caption' color='red'>
					{errors.lastName?.message}
					</Typography>

					<CustomTextField
						name="email"
						label="Correo"
						type="email"
						control={control}
						// error={errors.email ? true : false}
						// message={errors.email?.message}
						defaultValue=""
					/>

					{/* {errors.email && <span>Este campo es requerido</span>} */}
					<Typography variant='caption' color='red'>
						{errors.email?.message}
					</Typography>

					{/* Se debe utilizar un FormControl */}
					<FormControl fullWidth>
						<InputLabel>Genero</InputLabel>
						<Controller
							name="gender"
							control={control}
							rules={{required: true}}
							defaultValue={""}
							render={({field}) => (
								<Select
									{...field}
									label="Género"
								>
									<MenuItem value="famale">Femenino</MenuItem>
									<MenuItem value="male">Masculino</MenuItem>
									<MenuItem value="other">Otro</MenuItem>
								</Select>
							)}
						/>
					</FormControl>

					{/* {errors.gender && <span>Este campo es requerido</span>} */}
					<Typography variant='caption' color='red'>
						{errors.gender?.message}
					</Typography>

					<Box>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							sx={{mt: 2}}
						>
							Enviar
						</Button>
					</Box>
				</form>
			</Paper>
		</Box>
	);
};



// const defaultValues = {
//     customer: {
//         name: "",
//         lastname: "",
//         email: "",
//     },
//     address: {
//         address1: "",
//         address2: "",
//         city: "",
//         state: "",
//         zipCode: "",
//     },
//     card: {
//         number: "",
//         cvc: "",
//         expDate: "",
//         nameOnCard: "",
//     },

// };


                    {/* {activeStep === 0 && <DataPersonal handleNext={handleNext} handlerCustomer={handlerCustomer} />}

                    {activeStep === 1 && < DataDireccionEntrega handleNext={handleNext} handlerAddress={handlerAddress} />}

                    {activeStep === 2 && <DataDelPago handlerCard={handlerCard} />} */}



					    // const handlerCustomer = (data : any ) =>{
    //     setData({...data, customer : data})
    // }
    // const handlerAddress = (data : any ) =>{
    //     setData({...data, address : data})
    // }
    // const handlerCard = (data : any ) =>{
    //     setData({...data, card : data})
    // }


	    // const [data, setData]=useState(defaultValues)



		                    {/* 
                    {activeStep === 0 && (
                        <>
                            <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
                                Datos Personales
                            </Typography>
                            {errors.customer?.name && <span>Este campo es requerido</span>}
                            <Controller
                                name="customer.name"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Nombre"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />
                            {errors.customer?.lastname && <span>Este campo es requerido</span>}
                            <Controller
                                name="customer.lastname"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Apellido"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            {errors.customer?.email && <span>Este campo es requerido</span>}
                            <Controller
                                name="customer.email"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Email"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                        </>

                    )
                    }

                    {activeStep === 1 && (
                        <>
                            <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
                                Direccion de Entrega
                            </Typography>
                            {errors.customer?.address?.address1 && <span>Este campo es requerido</span>}
                            <Controller
                                name="customer.address.address1"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Dirección"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            <Controller
                                name="customer.address.address2"
                                control={control}
                                defaultValue={""}
                                rules={{ required: false }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Dirección 2 "
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />
                            {errors.customer?.address?.city && <span>Este campo es requerido</span>}
                            <Controller
                                name="customer.address.city"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Ciudad"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />


                            {errors.customer?.address?.state && <span>Este campo es requerido</span>}
                            <Controller
                                name="customer.address.state"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Provincia"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            {errors.customer?.address?.zipCode && <span>Este campo es requerido</span>}
                            <Controller
                                name="customer.address.zipCode"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Codigo Postal"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />


                        </>

                    )
                    }

                    {activeStep === 2 && (
                        <>
                            <Typography sx={{ paddingBottom: "1rem" }} variant="h4" align="center">
                                Datos del Pago
                            </Typography>
                            {errors.card?.number && <span>Este campo es requerido</span>}
                            <Controller
                                name="card.number"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Numero de la Tarjeta"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            {errors.card?.nameOnCard && <span>Este campo es requerido</span>}
                            <Controller
                                name="card.nameOnCard"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Nombre en la Tarjeta"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            {errors.card?.expDate && <span>Este campo es requerido</span>}
                            <Controller
                                name="card.expDate"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="text"
                                        label="Fecha de Vencimiento"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />

                            {errors.card?.cvc && <span>Este campo es requerido</span>}
                            <Controller
                                name="card.cvc"
                                control={control}
                                defaultValue={""}
                                rules={{ required: true }}
                                render={({ field }: any) => (
                                    <TextField
                                        {...field}
                                        type="password"
                                        label="Código de seguridad"
                                        variant="outlined"
                                        fullWidth
                                        sx={{ mb: 2 }}
                                    />
                                )}
                            />
                        </>
                    )} 
                    */}