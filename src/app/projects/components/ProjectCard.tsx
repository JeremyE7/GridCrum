import Chip from '@/app/components/Chip'
import { Project } from '@/app/types'

export default function ProjectCard ({ project }: { project: Project }): JSX.Element | null {
  return (
    <>
      <img src={project.image} alt={project.description} />
      <footer>
        <h1>
          {project.name}
        </h1>
        <span>
          {project.tags.length > 0 && project.tags?.map((tag, index) => (
            <Chip key={index} styleChip={(typeof tag === 'string' ? {} : { backgroundColor: tag.colorBackground, color: tag.colorText })}>
              {(typeof tag === 'string' ? tag : tag.name)}
            </Chip>
          ))}
        </span>
        <p>
          {project.description}
        </p>
      </footer>
    </>
  )
}
