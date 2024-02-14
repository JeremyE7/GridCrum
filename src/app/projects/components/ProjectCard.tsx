import Chip from '@/app/components/Chip'
import { ProjectItem } from '@/app/types'

export default function ProjectCard ({ project }: { project: ProjectItem }): JSX.Element | null {
  return (
    <>
      <img src={project.data.image} alt={project.data.description} />
      <footer>
        <h1>
          {project.data.name}
        </h1>
        <span>
          {project.data.tags.map((tag, index) => (
            <Chip key={tag}>
              {tag}
            </Chip>
          ))}
        </span>
        <p>
          {project.data.description}
        </p>
      </footer>
    </>
  )
}
