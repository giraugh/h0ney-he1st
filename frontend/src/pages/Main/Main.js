import React, { useState } from 'react'
import { useCookieState } from 'use-cookie-state' 

import { Container, SkillBox, SkillSliderContainer, SummaryContainer, SubtleText, HighlightText, NotesArea, NotesContainer } from './mainStyle'

const VALUE_COUNT = 7

const Main = () => {
    const [value, setValue] = useState(3)

    // TODO: get from API
    const bear = {
        name: 'Kryptonite',
        descriptor: 'Hardy',
        species: 'Sea-Bear',
        role: 'Instigator',
        ability: 'Swim',
        roleAdvantage: 'Starting Fights'
    }

    return <Container>
        <SummaryBox bear={bear}/>
        <SkillSlider value={value} setValue={setValue}/>
        <ActionBox bear={bear} bearMode={value === 0} thiefMode={value === VALUE_COUNT - 1}/>
        <NotesBox />
    </Container>
}

const SummaryBox = ({ bear }) => {
    return <SummaryContainer>
        <HighlightText><div>The {bear.role}</div></HighlightText>
        <div><SubtleText>is</SubtleText></div>
        <div>{`"${bear.name}"`}</div>
        <div>{bear.descriptor} {bear.species}</div>
    </SummaryContainer>
}

const ActionBox = ({ bear, bearMode, thiefMode }) => {
    return <>
        {bearMode && <SummaryContainer className={'small warning'}>
            <div>You have gone wild!</div>
            <div>You can&apos;t speak English</div>
        </SummaryContainer>}
        {thiefMode && <SummaryContainer className={'small warning'}>
            <div>You&apos;re criminally mad!</div>
            <div>Betray the party!</div>
            <div><SubtleText>(In a small way)</SubtleText></div>
        </SummaryContainer>}
        <SummaryContainer className={'small'}>
            <div>As a {bear.species},</div>
            <div>you can use <HighlightText>{bear.ability}</HighlightText></div>
        </SummaryContainer>
        <SummaryContainer className={'small'}>
            <div>As the {bear.role},</div>
            <div>You&apos;re skilled at <HighlightText>{bear.roleAdvantage}</HighlightText></div>
        </SummaryContainer>
    </>
}

const SkillSlider = ({ value, setValue }) => {
    const bearValue = VALUE_COUNT - value - 1
    const criminalValue = value

    return <SkillSliderContainer style={{ '--count': VALUE_COUNT }}>
        {Array.from({ length: VALUE_COUNT }).map((_, i) =>
            <SkillBox
                key={i}
                data-index={i}
                onClick={() => setValue(i)}
                className={`${i === VALUE_COUNT - 1 ? 'end' : ''} ${i === 0 ? 'start' : ''} ${i === value ? 'active' : ''}`}>
                {i % (VALUE_COUNT - 1) === 0 && <span>
                    {i === 0 ? bearValue : criminalValue}
                </span>} 
                {false && value === i && i % (VALUE_COUNT-1) !== 0 && <span>
                        B{bearValue}
                        C{criminalValue}
                </span>}
            </SkillBox>
        )}
    </SkillSliderContainer>
}

const NotesBox = () => {
    const [notes, setNotes] = useCookieState('honey-heist-notes', '')

    return <NotesContainer>
        <NotesArea
            placeholder='You can write your own notes here!'
            value={notes}
            onChange={e => setNotes(e.target.value)}>
        </NotesArea>
    </NotesContainer>
}

export default Main
