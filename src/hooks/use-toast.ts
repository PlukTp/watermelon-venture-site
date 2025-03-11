
import { Toast, ToastActionElement, ToastProps } from "@/components/ui/toast"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

const TOAST_LIMIT = 5
const TOAST_REMOVE_DELAY = 1000000

type ToastState = {
  toasts: ToasterToast[]
}

import {
  createContext,
  useCallback,
  useContext,
  useReducer,
} from "react"

const ToastStateContext = createContext<ToastState | undefined>(undefined)

const ToastDispatchContext = createContext<React.Dispatch<ToastActionType> | undefined>(undefined)

export type ToastActionType =
  | { type: "ADD_TOAST"; toast: ToasterToast }
  | { type: "UPDATE_TOAST"; toast: Partial<ToasterToast> & { id: string } }
  | { type: "DISMISS_TOAST"; toastId?: string }
  | { type: "REMOVE_TOAST"; toastId?: string }

const toastReducer = (state: ToastState, action: ToastActionType): ToastState => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      }

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      }

    case "DISMISS_TOAST": {
      const { toastId } = action

      if (toastId) {
        return {
          ...state,
          toasts: state.toasts.map((t) =>
            t.id === toastId || toastId === undefined
              ? {
                  ...t,
                  open: false,
                }
              : t
          ),
        }
      }

      return {
        ...state,
        toasts: state.toasts.map((t) => ({
          ...t,
          open: false,
        })),
      }
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        }
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      }
    default:
      return state
  }
}

export const ToastProvider = (props: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(toastReducer, { toasts: [] })
  return (
    <ToastStateContext.Provider value={state}>
      <ToastDispatchContext.Provider value={dispatch}>
        {props.children}
      </ToastDispatchContext.Provider>
    </ToastStateContext.Provider>
  )
}

export const useToast = () => {
  const dispatch = useContext(ToastDispatchContext)
  const state = useContext(ToastStateContext)

  if (dispatch === undefined || state === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }

  const toast = useCallback(
    (props: Omit<ToasterToast, "id">) => {
      const id = Math.random().toString(36).substring(2, 9)
      dispatch({
        type: "ADD_TOAST",
        toast: {
          ...props,
          id,
          open: true,
        },
      })
      return id
    },
    [dispatch]
  )

  const update = useCallback(
    (props: Partial<ToasterToast> & { id: string }) => {
      dispatch({
        type: "UPDATE_TOAST",
        toast: props,
      })
    },
    [dispatch]
  )

  const dismiss = useCallback(
    (toastId?: string) => {
      dispatch({
        type: "DISMISS_TOAST",
        toastId,
      })
    },
    [dispatch]
  )

  const remove = useCallback(
    (toastId?: string) => {
      dispatch({
        type: "REMOVE_TOAST",
        toastId,
      })
    },
    [dispatch]
  )

  return {
    toasts: state.toasts,
    toast,
    update,
    dismiss,
    remove,
  }
}

export { toast } from "@/components/ui/use-toast"
