import { DragTarget } from "../interfaces/drag-drop.interface"
import { Component } from "./base-component.component"
import { Project } from "../interfaces/project.interface"
import { ProjectStatus } from "../interfaces/project.interface"
import { Autobind } from "../decorators/autobind.decorator"
import { projectState } from "../state/project.state"
import { ProjectItem } from "./project-item.component"

//ProjectList class
export class ProjectList extends Component<HTMLDivElement, HTMLElement> 
                    implements DragTarget{
    assignedProjects: Project[]
    constructor(private type: ProjectStatus) {
        super('project-list', 'app', false, `${type}-projects`)

        this.assignedProjects = []

        this.configure()
        this.renderContent()
    }

    @Autobind
    dragOverHandler(event: DragEvent): void {
        if(event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault()
            const listEl = this.element.querySelector('ul')!
            listEl.classList.add('droppable')

        }
    
    }
    @Autobind
    dropHandler(event: DragEvent): void {
        const projectId = event.dataTransfer!.getData('text/plain')
        projectState.moveProject(projectId, this.type)
    }   
    @Autobind
    dragLeaveHandler(_event: DragEvent): void {
        const listEl = this.element.querySelector('ul')!
        listEl.classList.remove('droppable')
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`)! as HTMLUListElement
        listEl.innerHTML = ''
        for (const projectItem of this.assignedProjects) {
            new ProjectItem(this.element.querySelector('ul')!.id, projectItem)
        }
    }
    configure() {
        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter(project => project.status === this.type)
            this.assignedProjects = relevantProjects
            this.renderProjects()
        })
        this.element.addEventListener('dragover', this.dragOverHandler)
        this.element.addEventListener('dragleave', this.dragLeaveHandler)
        this.element.addEventListener('drop', this.dropHandler)
    }
    renderContent() {
        const listId = `${this.type}-projects-list`
        this.element.querySelector('ul')!.id = listId
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`
    }
}