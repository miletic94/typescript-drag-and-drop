 //Autobind
 export function Autobind(_target: any,_methodName: string | Symbol, descriptor: PropertyDescriptor) {
    const method = descriptor.value
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return method.bind(this)
        }
    }
    return newDescriptor
}   
