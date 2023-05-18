import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Storage } from '../utils/storage'
import { StorageSchema } from '../utils/storage/schema'
import Button from './Button'
import Input from './Input'
import Modal from './Modal'

// Schema do formulário
const FirstSettingsSchema = z.object({
    age: z.coerce
        .number({
            required_error: 'É necessário colocar a idade!',
            invalid_type_error: 'Idade inválida!',
        })
        .finite('Idade inválida')
        .int('Idade inválida!')
        .positive('Idade inválida!'),
    weight: z.coerce
        .number({
            required_error: 'É necessário colocar o peso!',
            invalid_type_error: 'Peso inválido!',
        })
        .finite('Peso inválido!')
        .int('Peso inválido!')
        .positive('Peso inválido!'),
})

export type FirstSettingsType = z.infer<typeof FirstSettingsSchema>

interface FirstUsePopupProps {
    storage: Storage
}

export default function FirstUsePopup({ storage }: FirstUsePopupProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FirstSettingsType>({
        resolver: zodResolver(FirstSettingsSchema),
    })

    const setSettings = async ({ age, weight }: FirstSettingsType) => {
        const parsed = StorageSchema.parse({
            settings: {
                age,
                weight,
            },
        })

        // Salvar os dados e recarregar a página
        await storage.setData(parsed)
        window.location.reload()
    }

    return (
        <Modal show={true} canClose={false}>
            <Modal.Title>Primeiras configurações</Modal.Title>
            <Modal.Description>
                Olá, seja bem-vindo(a) ao <b>hidrata-app</b>, vamos começar? Informe sua idade e seu
                peso para calcularmos a quantidade diária de água ideal para você ;)
            </Modal.Description>
            <Modal.Content>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit(setSettings)}>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='age_fup' className='font-semibold'>
                            Idade
                        </label>
                        <Input
                            type='number'
                            placeholder='Ex: 35'
                            id='age_fup'
                            register={register}
                            validationSchema={FirstSettingsSchema}
                            name='age'
                        />
                        {errors.age && (
                            <span className='block font-sm text-red-500'>{errors.age.message}</span>
                        )}
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='weight_fup' className='font-semibold'>
                            Peso (em kg):
                        </label>
                        <Input
                            type='number'
                            placeholder='Ex: 70'
                            id='weight_fup'
                            register={register}
                            validationSchema={FirstSettingsSchema}
                            name='weight'
                        />
                        {errors.weight && (
                            <span className='block font-sm text-red-500'>
                                {errors.weight.message}
                            </span>
                        )}
                    </div>
                    <div>
                        {/* <button
                            type='submit'
                            className='bg-blue-600 text-white font-lg font-semibold py-2 px-4 rounded hover:bg-blue-700 transition-colors float-right'
                        >
                            Salvar
                        </button> */}
                        <Button type='submit' className='float-right'>
                            Salvar
                        </Button>
                    </div>
                </form>
            </Modal.Content>
        </Modal>
    )
}
