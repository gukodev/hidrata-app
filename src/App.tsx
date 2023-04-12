import { useEffect, useState } from 'react'
import FirstUsePopup from './components/FirstUsePopup'
import { Storage } from './utils/storage'

function App() {
    const [storage, setStorage] = useState(new Storage())
    const [firstUse, setFirstUse] = useState(false)

    useEffect(() => {
        ;(async () => {
            const data = await storage.getData()
            if (!data) setFirstUse(true)
        })()
    }, [])

    return (
        <main>
            {firstUse && <FirstUsePopup storage={storage} onReady={() => setFirstUse(false)} />}
        </main>
    )
}

export default App