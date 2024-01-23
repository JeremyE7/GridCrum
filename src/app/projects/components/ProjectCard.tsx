import Chip from '@/app/components/Chip'
import { ProjectItem } from '@/app/types'

export default function ProjectCard ({ project }: { project: ProjectItem }): JSX.Element | null {
  return (
    <>
      <img src={project.data.image} alt={project.data.description} />
      <footer>
        <span>
          <h1>
            {project.data.name}
          </h1>
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
