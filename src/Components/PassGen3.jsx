import React, {useCallback, useEffect, useRef, useState} from 'react';

function PassGen3(props) {

    const [length, setLength] = useState("8")
    const [password, setPassword] = useState("")
    const [numbers, setNumbers] = useState(false)
    const [characters, setCharacters] = useState(false)


    // Ref Hook
    const passwordRef = useRef(null);

    const randomPasswordGenerator = useCallback(
        () => {
            let pass = ""
            let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

            if (numbers) str += "0123456789"
            if (characters) str += "~!@#$%^&*_+:<>.?/"

            for (let i = 1; i <= length; i++) {
                let char = Math.floor(Math.random() * str.length + 1)
                pass += str.charAt(char)
            }

            setPassword(pass)
        },
        [setPassword, length, numbers, characters],
    );

    useEffect(() => {
        randomPasswordGenerator()
    }, [numbers, length, characters, randomPasswordGenerator]);

    const copyGeneratePassword = useCallback(
        () => {
            passwordRef.current?.select()
            passwordRef.current?.setSelectionRange(0, 100)
            window.navigator.clipboard.writeText(password)
        },
        [password],
    );

    return (
        <>
            <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange-500">
                <h1 className='text-white text-center my-3'>Password generator</h1>
                <div className="flex shadow rounded-lg overflow-hidden mb-4">
                    <input
                        value={password}
                        type="text"
                        className="outline-none w-full py-1 px-3"
                        placeholder="Password"
                        readOnly
                        ref={passwordRef}
                    />

                    <button
                        onClick={copyGeneratePassword}
                        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
                    >copy
                    </button>
                </div>

                <div className='flex text-sm gap-x-2'>
                    <div className='flex items-center gap-x-1'>
                        <input
                            type="range"
                            min={8}
                            max={100}
                            className='cursor-pointer'
                            value={length}
                            onChange={(e) => {
                                setLength(e.target.value)
                            }}
                        />
                        <label>Length: {length} </label>
                    </div>

                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            id="numberInput"
                            defaultChecked={numbers}
                            onClick={() => {
                                setNumbers((prev) => !prev)
                            }}
                        />
                        <label htmlFor="numberInput">Numbers</label>
                    </div>

                    <div className="flex items-center gap-x-1">
                        <input
                            type="checkbox"
                            id="characterInput"
                            defaultChecked={characters}
                            onClick={() => {
                                setCharacters(prev => !prev)
                            }}
                        />
                        <label htmlFor="characterInput">Characters</label>
                    </div>

                </div>
            </div>
        </>
    );
}

export default PassGen3;