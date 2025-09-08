import React, { useEffect, useRef, useState } from "react"

const TextSlider = ({ words }) => {
    const headlineRef = useRef(null)
    const wordsWrapperRef = useRef(null)
    const animationRef = useRef(null)
    const [currentWords, setCurrentWords] = useState(words)

    // Animation timing constants
    const animationDelay = 2500

    useEffect(() => {
        setCurrentWords(words)
        return () => {
            // Clean up any running animations when component unmounts or words change
            if (animationRef.current) {
                clearTimeout(animationRef.current)
            }
        }
    }, [words])

    useEffect(() => {
        if (wordsWrapperRef.current && headlineRef.current && currentWords.length > 0) {
            initHeadline()
        }
        return () => {
            if (animationRef.current) {
                clearTimeout(animationRef.current)
            }
        }
    }, [currentWords])

    const initHeadline = () => {
        if (animationRef.current) {
            clearTimeout(animationRef.current)
        }
        animateHeadline(headlineRef.current)
    }

    const animateHeadline = (headline) => {
        if (!headline || currentWords.length === 0) return

        // Set initial width based on the widest word
        const words = headline.querySelectorAll(".cd-words-wrapper b")
        let width = 0

        words.forEach((word) => {
            const wordWidth = word.offsetWidth
            if (wordWidth > width) width = wordWidth
        })

        const wrapper = headline.querySelector(".cd-words-wrapper")
        if (wrapper) {
            wrapper.style.width = `${width}px`
        }

        // Start animation
        animationRef.current = setTimeout(() => {
            const visibleWord = headline.querySelector(".is-visible")
            if (visibleWord) hideWord(visibleWord)
        }, animationDelay)
    }

    const hideWord = (word) => {
        if (!word) return

        const nextWord = takeNext(word)
        if (!nextWord) return

        switchWord(word, nextWord)
        animationRef.current = setTimeout(() => {
            hideWord(nextWord)
        }, animationDelay)
    }

    const takeNext = (word) => {
        if (!word) return null
        return word.nextElementSibling || word.parentElement?.firstElementChild
    }

    const switchWord = (oldWord, newWord) => {
        if (!oldWord || !newWord) return

        oldWord.classList.remove("is-visible")
        oldWord.classList.add("is-hidden")
        newWord.classList.remove("is-hidden")
        newWord.classList.add("is-visible")
    }

    if (currentWords.length === 0) {
        return null // or return some fallback UI
    }

    return (
        <span ref={headlineRef} className="cd-headline slide cs_accent_color">
            <span ref={wordsWrapperRef} className="cd-words-wrapper">
                {currentWords.map((word, index) => (
                    <b key={`${word}-${index}`} className={index === 0 ? "is-visible" : "is-hidden"}>
                        {word}
                    </b>
                ))}
            </span>
        </span>
    )
}

export default TextSlider
