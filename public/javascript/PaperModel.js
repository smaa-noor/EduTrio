class PaperModel {
    constructor(instType, instName, year, subject, group){
        this.instType = instType;
        this.instName = instName;
        this.year = year;
        this.subject = subject;
        this.group = group;
    }

    get instType(){
        return this.instType;
    }

    get instName(){
        this.instName;
    }

    get year(){
        this.year;
    }

    get subject(){
        this.subject;
    }

    get group(){
        this.group;
    }
}