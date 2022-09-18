import { ProjectInput } from "./components/project-input.component"
import { ProjectList } from "./components/project-list.component"
import { ProjectStatus } from "./interfaces/project.interface"

new ProjectInput()
new ProjectList(ProjectStatus.ACTIVE)
new ProjectList(ProjectStatus.FINISHED)
