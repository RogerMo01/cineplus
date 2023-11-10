using System;
using System.Net;
using System.Net.NetworkInformation;
using System.Linq;
namespace IpFinder;

public static class IpFinder
{
    public static string? GetIp()
    {
        // Obtiene una lista de todas las interfaces de red disponibles
        NetworkInterface[] networkInterfaces = NetworkInterface.GetAllNetworkInterfaces();

        foreach (NetworkInterface networkInterface in networkInterfaces)
        {
            if (networkInterface.NetworkInterfaceType == NetworkInterfaceType.Wireless80211 && networkInterface.OperationalStatus == OperationalStatus.Up)
            {
                IPInterfaceProperties ipProperties = networkInterface.GetIPProperties();
                UnicastIPAddressInformationCollection ipAddresses = ipProperties.UnicastAddresses;

                UnicastIPAddressInformation wifiIpAddressInfo = ipAddresses.FirstOrDefault(
                    ipAddressInfo => ipAddressInfo.Address != null && ipAddressInfo.Address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork
                );

                if (wifiIpAddressInfo != null && networkInterface.Name == "Wi-Fi")
                {
                    return wifiIpAddressInfo.Address.ToString();
                }
                
            }
        }
        return null;
    }
}
