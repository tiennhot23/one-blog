import './tag.css'

export default function Tag({ tag, onClick }) {
   return (
      <div onClick={() => onClick(tag.tag)}>
         {tag.isSelected ?
            <div className="selectedTag">
               <span className="selectedTagText">{tag.tag}</span>
            </div> :
            <div className="tag">
               <span className="tagText">{tag.tag}</span>
            </div>}
      </div>
   )
}
