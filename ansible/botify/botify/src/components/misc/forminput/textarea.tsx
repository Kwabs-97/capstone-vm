import { UseFormRegister } from "react-hook-form"
import { ChatbotDataInterface } from "@/app/types"
import { cn } from "@/lib/utils"

interface TextareaPropsInterface extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    register?: UseFormRegister<ChatbotDataInterface>
    name?: keyof ChatbotDataInterface
    className?:string
}
const Textarea: React.FC<TextareaPropsInterface> = ({register, name, className, ...props}) => {
 return(
    <textarea className={cn("min-h-32 border px-4 py-3 bg-gray-50 border-lightGray rounded-lg focus:border-2 focus:border-blue-500 focus:outline-none duration-150 transition-all", className)}
    {...(register && register(name!))} 
    {...props}
      />
 )
}

export default Textarea