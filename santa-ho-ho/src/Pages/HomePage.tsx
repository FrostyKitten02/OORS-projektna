import { Box, Typography } from "@mui/material";





export default function HomePage() {


    return (
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <Box>
                <Typography variant="h3" sx={{paddingBottom: "20px"}}>
                    O božičkovi Centrali!
                </Typography>
            </Box>
            <Box sx={{display: "flex"}}>
                <Box sx={{height: "300px", paddingRight: "30px"}}>
                    <img
                        alt="santa"
                        style={{height: "100%"}}
                        src="https://www.parents.com/thmb/Sqvp8_apWCSb5HX-a7oZAGiiOpE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-sb10069274b-004-3127f6c0c6d94f5094faf9bad44b2d7b.jpg"
                    />
                </Box>
                <Box sx={{maxWidth: "600px"}}>
                    <Typography variant="body1" sx={{paddingBottom: "20px"}}>
                        Sem Božiček in zelo sem vesel, da sem vsele da smo se letos tudi mi modernizirali in smo vam dostopni preko spleta. Čeprav še ni čas obdarovanja, vedno uživam v stiku s svojimi prijatelji iz vsega sveta.
                        Kot vsako leto, se tudi letos že pripravljam na veseli december, ko bomo skupaj praznovali Božič in novo leto. Želim si, da bo letošnji kot vsaki praznični čas prinesel obilje veselja, ljubezni in sreče v vaše domove.
                        Ne pozabite, da sta dobro srce in prijaznost najlepši darili, ki ju lahko podarite drug drugemu. Zapomnite si, da sem vedno tukaj, da vam priskočim na pomoč in razveselim vaše praznike.
                    </Typography>

                    <Typography variant="body1" sx={{paddingBottom: "20px"}}>
                        Dovolite mi, da vam na kratko predstavim, kako poteka delovanje moje božične operacije. Kot veste, imam dolgoletno tradicijo prinašanja daril za Božič in to seveda ne bi bilo mogoče brez pomoči mojih vrednih vil.
                    </Typography>
                </Box>
            </Box>
            <Box sx={{display: "flex", paddingTop: "20px"}}>
                <Box sx={{maxWidth: "600px"}}>
                    <Typography variant="body1" sx={{paddingBottom: "20px"}}>
                        Vsako leto se že zgodaj v decembru začnemo pripravljati na veliki dan. Najprej se lotimo izdelave in pakiranja daril, ki jih bom kasneje dostavil otrokom po vsem svetu. V tem procesu sodeluje veliko število mojih vil, ki se trudijo, da bi vsako darilo bilo unikatno in popolnoma prilagojeno posameznemu otroku.
                    </Typography>
                    <Typography variant="body1" sx={{paddingBottom: "20px"}}>
                        Ko so darila pripravljena, se prične najbolj naporno delo - razvozlanje, kje se vsak otrok nahaja. Tukaj mi pomaga posebna računalniška tehnologija, ki mi omogoča, da hitro in učinkovito določim najkrajšo pot za dostavo daril po vsem svetu.
                    </Typography>
                    <Typography variant="body1" sx={{paddingBottom: "20px"}}>
                        Nato se s svojim sanjskim vozom in vsemi potrebnimi vili odpravim na potovanje okoli sveta. Seveda se trudimo, da bi bili čim bolj hitri in učinkoviti, vendar pa vedno najdemo čas za obiske otrok po vsem svetu in njihovo nagovarjanje, da bi ostali prijazni in dobri.
                    </Typography>
                </Box>
                <Box sx={{height: "300px", paddingLeft: "30px"}}>
                    <img
                        alt="workshop"
                        style={{height: "100%"}}
                        src="https://skyparksantasvillage.com/content/uploads/2022/04/workshop8.jpeg"
                    />
                </Box>
            </Box>
        </Box>
    )
}