export class PaperModel {
    constructor(instType, instName, year, subject, group){
        this.instType = instType;
        this.instName = instName;
        this.year = year;
        this.subject = subject;
        this.group = group;
    }

    get getInstType(){
        return this.instType;
    }

    get getInstName(){
        this.instName;
    }

    get getYear(){
        this.year;
    }

    get getSubject(){
        this.subject;
    }

    get getGroup(){
        this.group;
    }

    set setInstType(instType){
        this.instType = instType;
    }

    set setInstName(instName){
        this.instName = instName;
    }

    set setYear(year){
        this.year = year;
    }

    set setSubject(subject){
        this.subject = subject;
    }

    set setGroup(group){
        this.group = group;
    }
}