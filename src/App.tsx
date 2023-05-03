import { useEffect, useState } from 'react'
import { Debug } from './components/Debug'
import FirstUsePopup from './components/FirstUsePopup'
import { useStorage } from './utils/storage'
import { StorageType } from './utils/storage/schema'
import { getRecommendedWaterIntake } from './utils/water'

function App() {
    const storage = useStorage()
    const [data, setData] = useState<StorageType | null>(null)
    const [debug, setDebug] = useState(false)

    // Data validation / First use detection
    const checkData = () => {
        if (!storage) return
        storage.getData().then((retrievedData) => {
            if (retrievedData && storage.isDataValid(retrievedData))
                setData(retrievedData as StorageType)
            else storage.clearData()
        })
    }

    useEffect(() => {
        checkData()
        document.addEventListener('keydown', (e) => {
            // ctrl d
            if (e.ctrlKey && e.key === 'd') {
                e.preventDefault()
                setDebug((prev) => !prev)
            }
        })
    }, [])

    if (!data)
        return (
            <main>
                <FirstUsePopup storage={storage} onReady={checkData} />
            </main>
        )

    const { age, weight } = data.settings
    const dailyWater = getRecommendedWaterIntake(age, weight)

    const dataList = [
        ['Idade', age],
        ['Peso', weight],
        ['Qtd. Água Diária', `${dailyWater} ml`],
    ]

    return (
        <>
            {debug && (
                <Debug>
                    <div className='my-5'>
                        <h1 className='font-white font-semibold text-xl'>Dados</h1>
                        <div className='my-2'>
                            {dataList.map((x) => {
                                return (
                                    <p className='text-zinc-300' key={x[0]}>
                                        <span className='text-white'>{x[0]}:</span> {x[1]}
                                    </p>
                                )
                            })}
                        </div>
                    </div>
                    <div className='my-5'>
                        <h1 className='font-white font-semibold text-xl'>JSON</h1>
                        <pre className='text-zinc-300 font-mono text-sm'>
                            {JSON.stringify(data, null, 2)}
                        </pre>
                    </div>
                </Debug>
            )}
            <main>
                <div className='max-w-screen-md mx-auto p-4'>
                    <h1 className='text-2xl font-white font-semibold'>hidrata-app</h1>
                </div>
            </main>
        </>
    )
}

export default App
