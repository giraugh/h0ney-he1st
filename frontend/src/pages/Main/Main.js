import React, { useState, useEffect } from 'react'
import { useCookieState } from 'use-cookie-state' 
import { useNavigate } from 'react-router-dom'

import { BigText, PartyTable, PartyBoxContainer, Button, Container, SkillBox, SkillSliderContainer, Box, SubtleText, HighlightText, NotesArea, NotesContainer } from './mainStyle'
import { useCurrentBear } from 'hooks'
import { fetchAllBears } from 'services/bear'

const VALUE_COUNT = 7

const Main = () => {
  const [currentBear, setCurrentBear] = useCurrentBear()
  const [value, setValue] = useState(3)
  const navigate = useNavigate()

  const changeBear = () => {
    if (window.confirm('Are you sure?')) {
      setCurrentBear({})
      navigate('/signup')
    }
  }

  return <Container>
    <SummaryBox bear={currentBear}/>
    <SkillSlider value={value} setValue={setValue}/>
    <ActionBox bear={currentBear} bearMode={value === 0} thiefMode={value === VALUE_COUNT - 1}/>
    <NotesBox bear={currentBear} />
    <PartyBox bear={currentBear} />
    <Box className="small subtle">
      <Button onClick={changeBear}>Change Bear</Button>
    </Box>
  </Container>
}

const SummaryBox = ({ bear }) => {
  return <Box>
    <div className='split-on-small'><span>The {bear?.descriptor}</span> <span>{bear?.species}</span></div>
    <div><BigText>{`"${bear?.bear_name}"`}</BigText></div>
    <div><SubtleText>is</SubtleText></div>
    <div>The <HighlightText>{bear?.role}</HighlightText></div>
  </Box>
}

const ActionBox = ({ bear, bearMode, thiefMode }) => {
  return <>
    {bearMode && <Box className={'small warning'}>
      <div>You have gone wild!</div>
      <div>You can&apos;t speak English</div>
    </Box>}
    {thiefMode && <Box className={'small warning'}>
      <div>You&apos;re criminally mad!</div>
      <div>Betray the party!</div>
      <div><SubtleText>(In a small way)</SubtleText></div>
    </Box>}
    <Box className={'small'}>
      <div>As a {bear?.species},</div>
      <div>you can use <HighlightText>{bear?.ability}</HighlightText></div>
    </Box>
    <Box className={'small'}>
      <div>As the {bear?.role},</div>
      <div>You&apos;re skilled at <HighlightText>{bear?.role_advantage}</HighlightText></div>
    </Box>
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

const NotesBox = ({ bear }) => {
  const [notes, setNotes] = useCookieState(`honey-heist-notes-${bear?.bear_name.replace(/\s/g, '')}-${bear?.gamecode}`, '')

  return <NotesContainer>
    <NotesArea
      placeholder='You can write your own notes here!'
      value={notes}
      onChange={e => setNotes(e.target.value)}>
    </NotesArea>
  </NotesContainer>
}

const PartyBox = ({ bear }) => {
  const [title] = useState(['Party', 'Gang', 'Sleuth', 'Team', 'Crew'][Math.random()*5|0])
  const [bears, setBears] = useState([])

  // Get players
  useEffect(() => {
    if (bear?.gamecode) {
      fetchAllBears({ gamecode: bear.gamecode })
        .then(bears => setBears(bears))
    }
  }, [bear?.gamecode])

  return <PartyBoxContainer className={'medium'}>
    <h3> The {title} </h3>
    <PartyTable>
      <thead>
        <tr>
          <td>Player</td>
          <td>Role</td>
          <td>Name</td>
        </tr>
      </thead>
      <tbody>
        {bears.map(bear => <tr key={bear.bear_name}>
          <td>{bear.player_name}</td>
          <td>The {bear.role}</td>
          <td>&quot;{bear.bear_name}&quot;</td>
        </tr>)}
      </tbody>
    </PartyTable>
  </PartyBoxContainer>
}

export default Main
