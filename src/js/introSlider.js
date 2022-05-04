import { gsap } from 'gsap';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(Flip);

export default function introSlider() {
    const elements = Array.from(document.querySelectorAll('.js-intro-slider'));

    elements.forEach(element => {
        const slots = Array.from(element.querySelectorAll('.intro__slider-container'));
        const cards = Array.from(element.querySelectorAll('.intro__slider-card'));
        const tabs = Array.from(element.querySelectorAll('.intro__slider-text-slider-tabs-item'))

        let activeIndex = 0;
        let cardsPositions = [null, null, null, ...cards];
        let animating = false;
        let duration = 0.8;

        function placeCards(index) {
            const state = Flip.getState('.intro__slider-card-moon', { props: 'color' });

            if (index === 0) {
                cardsPositions = [null, null, null, ...cards];
            } else if (index === 1) {
                cardsPositions = [null, null, ...cards, null];
            } else if (index === 2) {
                cardsPositions = [null, ...cards, null, null];
            } else if (index === 3) {
                cardsPositions = [...cards, null, null, null];
            } else {
                console.log('No card with such index');
                return;
            }

            cardsPositions.forEach((card, cardIndex) => {
                if (card !== null) {
                    slots[cardIndex].appendChild(card);
                }
            });

            activeIndex = index;
            animating = true;

            return Flip.from(state, {
                ease: 'power1.inOut',
                duration: duration,
                absolute: true,
                scale: true,
                nested: true,
                onComplete: () => {
                    animating = false;
                }
            });
        }


        const setActiveTab = index => {
            tabs.forEach(tab => tab.classList.remove('active'));
            tabs[index].classList.add('active');
        }

        if (tabs.length) {
            setActiveTab(0);
        }

        cards.forEach((card, cardIndex) => {
            card.addEventListener('click', event => {
                event.preventDefault();
                if (animating) return;
                setActiveTab(cardIndex);
                const indexDifference = cardIndex - activeIndex;

                if (Math.abs(indexDifference) === 1) {
                    duration = 0.8;
                    placeCards(cardIndex);
                } else if (cardIndex - activeIndex > 1) {
                    console.log('card index', cardIndex);
                    console.log('active index', activeIndex);
                    let indexes = [];

                    for (let i = activeIndex + 1; i <= cardIndex; i++) {
                        indexes.push(i);
                    }

                    console.log('indexes', indexes);
                    duration = 0.6;
                    indexes.forEach((index, indexOfIndex) => {
                        gsap.delayedCall(indexOfIndex * duration, () => {
                            placeCards(index);
                        });
                    });
                } else if (cardIndex - activeIndex < 1) {
                    console.log('card index', cardIndex);
                    console.log('active index', activeIndex);
                    let indexes = [];

                    for (let i = activeIndex - 1; i >= cardIndex; i--) {
                        indexes.push(i);
                    }

                    console.log('indexes', indexes);
                    duration = 0.6;
                    indexes.forEach((index, indexOfIndex) => {
                        gsap.delayedCall(indexOfIndex * duration, () => {
                            placeCards(index);
                        });
                    });
                } else {
                    console.log('No');
                }
            });
        });
    });
}
