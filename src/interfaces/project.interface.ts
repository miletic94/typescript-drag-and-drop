//Project Type
export enum ProjectStatus {
    ACTIVE = 'active',
    FINISHED = 'finished'
}

export class Project {
    constructor(
        public id:string, 
        public title: string, 
        public description: string, 
        public poeple: number, 
        public status: ProjectStatus
        ) {}
}