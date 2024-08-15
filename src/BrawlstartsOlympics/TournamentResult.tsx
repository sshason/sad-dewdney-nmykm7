import React, { useState } from 'react';
import Modal from './Modal';
import './TournamentResult.css';
import { BrawlStarCharacter, Prize, PrizeToImage } from '../App';

interface TournamentResultProps {
    isWin: boolean;
    onClose: () => void;
    onRestart: () => void;
    character: BrawlStarCharacter;
    prize: Prize;
}

const TournamentResult: React.FC<TournamentResultProps> = ({ isWin, onClose, onRestart, character, prize }) => {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        onRestart();
    };

    return (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
            <div className="tournament-result">
                <h1 className='title'>{isWin ? 'Congratulations!' : 'You lost the tournament!'}</h1>
                <p>{isWin ? 'You are the champion!' : 'Better luck next time!'}</p>
                <img src={character.imageUrlNew} alt={character.name} className="character-image" />
                {prize != Prize.None && <div><p>You won</p><img src={PrizeToImage[prize]} /></div>}
                <button onClick={onClose}>Close</button>
            </div>
        </Modal>
    );
};

export default TournamentResult;