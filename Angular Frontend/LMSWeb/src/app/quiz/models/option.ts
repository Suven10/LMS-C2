export class Option {
    id: number;
    questionId: number;
    name: string;
    isAnswer: boolean;
    selected: boolean;

    constructor(data: any) {
        //debugger;
        data = data || {};
        this.name = data.name;
        this.isAnswer = data.isAnswer;
    }
}
