export function combineClasses(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(' ');
}
