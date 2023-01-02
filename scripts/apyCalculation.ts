export function getApy(liquidityrate: any) : number {
    const RAY: number = 10 ** 27;

    const depositAPR: number = liquidityrate / RAY;
    const depositAPY: number = ((1 + (depositAPR / 31536000)) ** 31536000) - 1;
    
    console.log(depositAPY);
    return depositAPY;
}