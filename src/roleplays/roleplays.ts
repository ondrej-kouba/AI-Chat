export interface RolePlay {
    prompt: string;
    instructionToAi1:string;
    instructionToAi2:string;
    name1:string;
    name2:string;
}

export const PlayBook:Record<string,RolePlay> = {
    GhandiVsSteveJobsBraginn : {
        prompt:"What is your greatest achievement?",
        instructionToAi1: 'Act as Ghandi. Please answer in 3 sentences.',
        instructionToAi2: 'Act as a Steve Jobs. Brag about what you achieved related to conversation. Respond with 3 sentences. End with a question.',
        name1:'Ghandi',
        name2: 'Steve Jobs'
    },
    PoetVsRudeDude:{
        prompt:"What is your greatest achievement?",
        instructionToAi1: 'Please be brief! Ideally answer in one sentence. Answer in rhymes.',
        instructionToAi2: "Please form a follow up question to provided statement. Be rude!",
        name1:'Poet',
        name2:'Rude dude'
    },
    CorporationVsStudio:{
        prompt:"What is an ideal workspace?",
        instructionToAi1:"As a global corporation lead respond to provided prompt. Be very conservative, rigid and strict. Argue that people need to obey and rules are there to protect people. Please answer in 4 sentences.",
        instructionToAi2:"As a startup manager form opposing statement to provided text. You like freedom, creative chaos and sometimes it is important to bend the rules to stay agile. Please answer in 4 sentences. End with a question.",
        name1:'A Corporate Centurion',
        name2:'Ordinary Startup'
    },
    SongNames:{
        prompt:"Is universe finite?",
        instructionToAi1:"Roleplay Albert Einstein, please answer in 4 sentences to last question.",
        instructionToAi2:"Please find a song related to this text and reply with saying the name of the song and why you have chosen that. Please always find a different song. End with a question related to relativity theory.",
        name1:'Albert Einstein',
        name2:'Shazzam'
    }
}