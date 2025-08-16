import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
   return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 ">
         <Card className="w-full max-w-md border-0 shadow-lg rounded-xl overflow-hidden bg-background">
            <CardHeader className="bg-destructive text-destructive-foreground">
               <div className="flex items-center justify-center">
                  <AlertCircle className="h-10 w-10 mr-3" />
                  <CardTitle className="font-bold text-white">Sooo Sad</CardTitle>
               </div>
            </CardHeader>

            <CardContent className="p-6">
               <div className="space-y-4">
                  <p className="text-center text-muted-foreground font-semibold">
                     Oops! System Error <br /> {error.message}
                  </p>

                  <div className="flex flex-col gap-3 pt-2">
                     <Button size="lg" className="w-full gap-2" onClick={reset}>
                        <RefreshCw className="h-4 w-4" />
                        Reload System
                     </Button>

                     <Button variant="outline" size="lg" className="w-full" onClick={() => (window.location.href = "/")}>
                        Return Home
                     </Button>
                  </div>
               </div>
            </CardContent>
         </Card>
      </div>
   );
}
