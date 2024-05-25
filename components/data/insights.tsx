import darkCircleImg from './../../assets/images/darkCircle.png'
import girlPackImg from './../../assets/images/girlPack.png'
import manImg from './../../assets/images/man.png'
import darkMainImg from './../../assets/images/darkMain.png'
import sleepImg from './../../assets/images/sleep.png'
import coldImg from './../../assets/images/cold.png'
import yogaImg from './../../assets/images/yoga.png'
import balanceImg from './../../assets/images/balance.png'
import cleanseImg from './../../assets/images/cleanse.png'
import cleanseMainImg from './../../assets/images/cleanseMain.png'
import knowImg from './../../assets/images/know.png'
import washImg from './../../assets/images/wash.png'
import wetImg from './../../assets/images/wet.png'
import applyImg from './../../assets/images/apply.png'
import patImg from './../../assets/images/pat.png'
import helpImg from './../../assets/images/help.png'
import dietImg from './../../assets/images/diet.png'
import dietMainImg from './../../assets/images/dietMain.png'
import bananaImg from './../../assets/images/banana.png'
import citrusImg from './../../assets/images/citrus.png'
import acaiImg from './../../assets/images/acai.png'
import cranImg from './../../assets/images/cran.png'
 const insightsData = [
    {id: 1,
        image: darkCircleImg,
        insights: '8 home remedies for dark circles',
        slider: [
            {id: 1,
                feature: '8 home remedies for dark circles',
                art: darkMainImg,
            },
            {id: 2,
               header: 'Adequate Sleep',
               body: 'Ensure 7-9 hours of quality sleep each night. Lack of sleep can contribute to dark circles and puffiness under the eyes.',
                art: sleepImg,
            },
            {id: 3,
                header: 'Cold Compress',
                body: 'Apply a cold compress to the eye area. This can reduce swelling and shrink dilated blood vessels.',
                 art: coldImg,
            },
            {id: 4,
                header: 'Balanced Diet',
                body: 'Maintain a diet rich in antioxidants, Vitamin C, Vitamin K, iron and collagen.These nutrients are vital for skin health.',
                 art: balanceImg,
            },
            {id: 5,
                header: 'Face Yoga',
                body: 'Face yoga improves blood circulation to the eye area, reducing dark circles by nourishing and oxygenatung the skin.',
                 art: yogaImg,
            },
            {id: 6,
                 art: helpImg,
            },
        ]
    },
    {id: 2,
        image: cleanseImg,
        insights: 'Cleanse Your Way To Glowing Skin',

        slider: [
            {id: 1,
                feature: 'Cleanse Your Way To Glowing Skin',
                 art: cleanseMainImg,
            },
            {id: 2,
                header: '1. Determine your skin type',
                body: 'If you have oily skin, look for a cleanser that helps control oil production. If you have dry sjkin, choos a gentle, hydrating cleanser',
                 art: knowImg,
            },
            {id: 3,
                header: '2. Wash your hands',
                body: "Before starting your skincare routine, it's important to wash your hands to avoid transferring dirt and bacteria to you face.",
                 art: washImg,
            },
            {id: 4,
                header: '3. Wet your face',
                body: 'Splash your face with lukewarm water to wet your skin and prepare it for cleansing.',
                 art: wetImg,
            },
            {id: 5,
                header: '5. Apply cleanser',
                body: 'Use a pea-sized amount of cleanser and apply it your face, and massage it in a gentle circular motion for about 30 seconds.',
                 art: applyImg,
            },
            {id: 6,
                header: '6. Pat Dry',
                body: 'Gently pat your face dry with a clean, soft  towel. Avoid rubbing your face as it can cause irritation and damage to your skin.',
                 art: patImg,
            },
            {id: 7,

                 art: helpImg,
            },
        ]
    },
    {id: 3,
        image: dietImg,
        insights: '5 Superfoods for healthy skin',

        slider: [
            {id: 1,
                feature: '5 Superfoods for healthy skin',
                 art: dietMainImg,
            },
            {id: 2,
                header: 'Bananas',
                body: 'Bananas, rich in vitamins A and C, reduce fine lines, wrinkles, age spots and even out skin tone.',
                 art: bananaImg,
            },
            {id: 3,
                header: 'Acai Berries',
                body: 'Acai Berries, packed with vitamin E and antioxidants, promote skin cell longevity and combat inflammation.',
                 art: acaiImg,
            },
            {id: 4,
                header: 'Cranberries',
                body: 'Cranberries, help balance oil production, reduce inflammation, and contain flavonoids that help reduce oxidative stress.',
                 art: cranImg,
            },
            {id: 5,
                header: 'Citrus fruits',
                body: "Citrus fruits, boost vitamin A and C levels, stimulate collagen production and enhance the skin's natural sun protection.",
                 art: citrusImg,
            },
            {id: 6,

                 art: helpImg,
            },
        ]
    },

]

export default insightsData;