// Intro Page Class
class Intro {
    constructor() {
        
    }    
    createIntroSection(title, subtitle, scrollHint) {        
        const section = document.createElement("section");
        section.classList.add("intro");

        const wrapper = document.createElement("div");
        wrapper.classList.add("content");

        const titleEle = document.createElement("h1");
        const subtitleEle = document.createElement("h2");    
        titleEle.appendChild(document.createTextNode(title));
        subtitleEle.appendChild(document.createTextNode(subtitle));        

        section.appendChild(wrapper);
        wrapper.appendChild(titleEle);
        wrapper.appendChild(subtitleEle);

        if(scrollHint) {
            const scrollHintEle = document.createElement("div");
            scrollHintEle.classList.add("scroll-hint");
            scrollHintEle.appendChild(document.createTextNode("Scroll Down (j/k)"));
            wrapper.appendChild(scrollHintEle);
        }
        

        return section; 
    }
}

export default Intro;
