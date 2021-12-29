import React from 'react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Stack,
    useColorModeValue,
} from '@chakra-ui/react'
import {Form,Field,Formik} from "formik";
import { useToast } from '@chakra-ui/react'
import { doc, updateDoc} from "firebase/firestore";
import {db} from "../../utils/init-firebase";
import Select from "../components/Fields/Select";





export default  function Update ({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const toast = useToast()
    const firstField = React.useRef()

    async  function updateUsers2(values) {

        const userRef = doc(db, 'users', id.id);
        await  updateDoc(userRef,{
            id: id.id,
            displayName:values.displayName,
            email: values.email,
            administrativeDistrict:values.administrativeDistrict,
            legislativeDistrict:values.legislativeDistrict,
            barangay:values.barangay,

        })
    }
    const legislativeDistrictOptions = [
        { key: 'D1', value: 'd1' },
        { key: 'D2', value: 'd2' },
        { key: 'D3', value: 'd3' }
    ];
    const administrativeDistricts = [
        { key: 'Select an option', value: '' },
        { key: 'Poblacion', value: 'Poblacion' },
        { key: 'Talomo', value: 'Talomo' },
        { key: 'Agdao', value: 'Agdao' },
        { key: 'Buhangin', value: 'Buhangin' },
        { key: 'Bunawan', value: 'Bunawan' },
        { key: 'Paquibato', value: 'paquibato' },
        { key: 'Baguio', value: 'Baguio' },
        { key: 'Calinan', value: 'Calinan' },
        { key: 'Marilog', value: 'Marilog' },
        { key: 'Bunawan', value: 'Bunawan' },
        { key: 'Toril', value: 'Toril' },
        { key: 'Tugbok', value: 'Tugbok' },
    ]
    const barangayOptions = [
        { key: 'Colosas', value: 'cold' },
        { key: 'Fatima (Benowang)', value: 'fat' },
        { key: 'Lumiad', value: 'lum' },
        { key: 'Mabuhay', value: 'mab' },
        { key: 'Malabog', value: 'mal' },
        { key: 'Mapula', value: 'map' },
        { key: 'Panalum', value: 'pan' },
        { key: 'Pandaitan', value: 'pand' },
        { key: 'Paquibato Proper', value: 'paq' },
        { key: 'Paradise Embak', value: 'pare' },
        { key: 'Salapawan', value: 'sal' },
        { key: 'Sumimao', value: 'sumi' },
        { key: 'Tapak', value: 'tap' }
    ];

    return (
        <>

            <Button
                w={'full'}
                mt={8}
                bg={useColorModeValue('#151f21', 'gray.900')}
                color={'white'}
                rounded={'md'} ref={btnRef} colorScheme='black' onClick={onOpen}
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: 'lg',
                }}
            >
                Update User

            </Button>


            <Drawer
                isOpen={isOpen}
                placement='right'
                initialFocusRef={firstField}
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth='1px'>
                        Update Social Worker Account
                    </DrawerHeader>

                    <DrawerBody>
                        <Stack spacing='24px'>
                            <Formik
                                initialValues={{
                                    id: id.id,
                                    displayName:id.displayName,
                                    email: id.email,
                                    administrativeDistrict: id.administrativeDistrict,
                                    legislativeDistrict: id.legislativeDistrict,
                                    barangay: id.barangay,
                                }}
                                onSubmit={(values, actions) => {
                                    updateUsers2(values)
                                        .then(() => {
                                            toast({
                                                title: 'Success',
                                                description: 'User Profile Updated Successfully',
                                                status: 'info',
                                                duration: 9000,
                                                isClosable: true,
                                            })
                                            actions.setSubmitting(false)
                                            onClose()
                                        })

                                }}
                            >
                                {(props) => (
                                    <Form>
                                        <Field name='displayName' >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.displayName && form.touched.displayName}>
                                                    <FormLabel htmlFor='displayName'>Display Name</FormLabel>
                                                    <Input {...field} id='displayName' placeholder='displayName' />
                                                    <FormErrorMessage>{form.errors.displayName}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>

                                        <Field name='email' >
                                            {({ field, form }) => (
                                                <FormControl isInvalid={form.errors.email && form.touched.email}>
                                                    <FormLabel htmlFor='email'>Email Address</FormLabel>
                                                    <Input {...field} id='email' placeholder='email' />
                                                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Select
                                            label="Legislative District"
                                            name="legislativeDistrict"
                                            options={legislativeDistrictOptions}
                                        />
                                        <Select
                                            label="Administrative District"
                                            name="administrativeDistrict"
                                            options={administrativeDistricts}
                                        />
                                        <Select
                                            label="Barangay"
                                            name="barangay"
                                            options={barangayOptions}
                                        />

                                        <Button
                                            mt={4}
                                            colorScheme='teal'
                                            isLoading={props.isSubmitting}
                                            type='submit'
                                        >
                                            Submit
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Stack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth='1px'>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>


                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}
